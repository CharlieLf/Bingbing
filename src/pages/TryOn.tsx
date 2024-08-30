import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import NavbarLayout from "@layouts/NavbarLayout";
import { getProductImageQuery, getProductQuery } from "@/services/productService";
import ButtonSmall from "@components/ButtonSmall";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TypeUtils from "@utils/TypeUtils";
import ImagePlaceholder from "@components/ImagePlaceholder";

const TryOn: React.FC = () => {
    const { id } = useParams();

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isWebcamOn, setIsWebcamOn] = useState<boolean>(false);
    const webCamRef = useRef<Webcam>(null);

    const { product, getProduct, getProductLoading } = getProductQuery();
    const { getProductImage, getProductImageLoading } = getProductImageQuery();
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.result) {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    const uint8Array = new Uint8Array(arrayBuffer);
                    setImageUrl(URL.createObjectURL(file));
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