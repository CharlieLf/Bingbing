import Navbar from "@components/Navbar";
import image from "../assets/product/register.jpg";
import IconCart from "../assets/icons/IconCart";
import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import NavbarLayout from "@layouts/NavbarLayout";

const TryOn: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string|null>(null);
    const [imageFileUrl, setImageFileUrl] = useState<string | undefined>();
    const webCamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const imageSrc = webCamRef.current?.getScreenshot() || null;
        setImageUrl(imageSrc);
    }, [webCamRef]);

    const base64ToFile = (dataUrl: string, filename: string): File => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };

    useEffect(() => {
        if (imageUrl) {
            const file = base64ToFile(imageUrl, 'captured-image.jpg');

            const fileUrl = URL.createObjectURL(file);
            setImageFileUrl(fileUrl);
        }

        return () => {
            if (imageFileUrl) {
                URL.revokeObjectURL(imageFileUrl);
            }
        };
    }, [imageUrl]);

    return(
        <NavbarLayout>
            <div className="flex mx-20">
                <div className="mr-10">
                    {imageUrl ?  
                        <img src={imageFileUrl}/>
                        :
                        <Webcam width={1500} height={1000} ref={webCamRef}/>
                    }
                </div>

                <div className="flex flex-col justify-between w-[50%] p-3">
                    <div>
                        <p className="text-2xl font-bold">Textured Straight Pants</p>
                        <p>IDR. 399,000</p>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <button className="p-5 bg-white border-black border">BACK TO PRODUCT DETAIL</button>
                        <button onClick={capture} className="p-5 bg-black border-black border text-white font-bold">CAPTURE</button>
                    </div>
                </div>
            </div>
        </NavbarLayout>
    )
}

export default TryOn;