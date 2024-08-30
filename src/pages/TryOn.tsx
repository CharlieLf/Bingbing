import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import NavbarLayout from "@layouts/NavbarLayout";
import { getProductImageQuery, getProductQuery } from "@/services/productService";
import ButtonSmall from "@components/ButtonSmall";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TypeUtils from "@utils/TypeUtils";
import ImagePlaceholder from "@components/ImagePlaceholder";
import axios from "axios"; 

const TryOn: React.FC = () => {
    const { id } = useParams();

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isWebcamOn, setIsWebcamOn] = useState<boolean>(false);
    const webCamRef = useRef<Webcam>(null);

    const { product, getProduct, getProductLoading } = getProductQuery();
    const { getProductImage, getProductImageLoading } = getProductImageQuery();
    const [resultImage, setResultImage] = useState('')
    const [productImageUrl, setProductImageUrl] = useState<string | undefined | null>();

    const imageInput = useRef<HTMLInputElement>(null);

    const capture = useCallback(() => {
        const imageSrc = webCamRef.current?.getScreenshot() || null;
        setImageUrl(imageSrc);
        setIsWebcamOn(false);
    }, [webCamRef]);

    const openImageInput = () => {
        if (imageInput.current) {
            imageInput.current.click();
        }
    };

    const convertToBase64 = (imageUrl: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imageUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg').split(',')[1]);
            };
            img.onerror = (error) => reject(error);
        });
    };

    const sendImagesToFlask = async (image1Url: string, image2Url: string) => {
        try {
            // Show a loading indicator
            Swal.fire({
                title: 'Processing images...',
                text: 'Please wait while the images are being processed.',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });
    
            // Convert images to base64
            const image1Base64 = await convertToBase64(image1Url);
            const image2Base64 = await convertToBase64(image2Url);
    
            // Send a POST request to the Flask server
            const response = await axios.post('http://localhost:5000/process', {
                image1: image2Base64,
                image2: image1Base64
            });
    
            // Hide the loading indicator
            Swal.close();
    
            const resultImage = response.data.result_image;
    
            if (!response || !resultImage) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error processing images',
                    text: 'Server error'
                });
                return;
            }
    
            // Set the processed result image
            setResultImage(`data:image/jpeg;base64,${resultImage}`);
    
            Swal.fire({
                icon: 'success',
                title: 'Images processed successfully!',
                text: response.data.message,
            });
    
        } catch (error) {
            // Hide the loading indicator in case of an error
            Swal.close();
    
            Swal.fire({
                icon: 'error',
                title: 'Error processing images',
                text: 'An error occurred while processing images.',
            });
        }
    };
    

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = async () => {
                if (reader.result) {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    const uint8Array = new Uint8Array(arrayBuffer);
                    const uploadedImageUrl = URL.createObjectURL(file);

                    setImageUrl(uploadedImageUrl);

                    if (productImageUrl) {
                        await sendImagesToFlask(uploadedImageUrl, productImageUrl);
                    }
                }
            };

            reader.readAsArrayBuffer(file);
        }
    };

    async function fetchProductData() {
        if (!id) return;
        const product = await getProduct([BigInt(Number.parseInt(id)), []]);
        if (!product || 'err' in product) {
            return;
        }
        const image = await getProductImage([BigInt(Number.parseInt(id))]);
        if (!image || image.length === 0) {
            return;
        }
        setProductImageUrl(TypeUtils.byteArrayToImageURL(image[0]));
    }

    useEffect(() => {
        fetchProductData();
    }, []);

    if (getProductLoading || getProductImageLoading) {
        return (
            <NavbarLayout>
                <div className="flex justify-center text-2xl font-semibold text-gray-700 animate-pulse mt-10">
                    Loading...
                </div>
            </NavbarLayout>
        )
    }

    return (
        <NavbarLayout>
            <div className="flex mx-20">
                <div className="mr-10 w-[40vw] h-[60vh] flex flex-col items-center justify-evenly">
                    {
                        resultImage ? <img className="w-full h-full" src={resultImage} /> :
                        isWebcamOn ? <Webcam className="w-full h-full" ref={webCamRef} /> :
                            imageUrl ? <img className="w-full h-full" src={imageUrl} /> :
                                <ImagePlaceholder imageUrl={productImageUrl} />
                    }
                </div>

                <div className="flex flex-col justify-between w-[50%] p-3">
                    <div>
                        <p className="text-2xl font-bold">{product?.name}</p>
                        <p>IDR. {product?.formatPrice()}</p>
                    </div>

                    <div className="flex flex-col space-y-3">
                        {isWebcamOn && <button onClick={capture}
                            className="p-5 bg-black border-black border text-white font-bold">
                            CAPTURE
                        </button>}
                        <div className="flex w-full justify-between">
                            <ButtonSmall onclick={openImageInput} text="Upload Image" />
                            <ButtonSmall onclick={() => setIsWebcamOn(true)}
                                text="Take Photo"
                                variant="secondary" />
                        </div>
                        <button className="p-5 bg-white border-black border">
                            BACK TO PRODUCT DETAIL
                        </button>
                    </div>
                </div>
                <input className="hidden" onChange={handleImageChange} type="file" ref={imageInput} accept="image/*" />
            </div>
        </NavbarLayout>
    )
}

export default TryOn;