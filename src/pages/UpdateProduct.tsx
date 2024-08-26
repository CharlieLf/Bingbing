import IconArrowBack from "@assets/icons/IconArrowBack"
import Input from "@components/Input";
import { useEffect, useRef, useState } from "react";
import CategoryField from "@components/CategoryField";
import { Gender, genderSelection, Season, seasonSelection, ClothingType, typeSelection } from "@models/category";
import { editProductUpdate, getProductQuery } from "@/services/productService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@ic-reactor/react";
import defaultImage from "@assets/product/testing.jpg";
import Product from "@models/product";
import Swal from "sweetalert2";
import TypeUtils from "@utils/TypeUtils";

const UpdateProduct: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { product, getProduct } = getProductQuery();
    const { identity } = useAuth();

    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);

    const [selectedGender, setSelectedGender] = useState<Gender>(genderSelection[0]);
    const [selectedSeason, setSelectedSeason] = useState<Season>(seasonSelection[0]);
    const [selectedType, setSelectedType] = useState<ClothingType>(typeSelection[0]);
    const [selectedClothing, setSelectedClothing] = useState<string | undefined>();

    const [image, setImage] = useState<Uint8Array>(new Uint8Array());
    const [imageUrl, setImageUrl] = useState<string>('');
    const imageInput = useRef<HTMLInputElement>(null);

    const { editProduct } = editProductUpdate();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
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
                    setImage(uint8Array);
                    setImageUrl(URL.createObjectURL(file));
                }
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const handleSubmit = async () => {
        if (!productName || !price || !stock || image.length === 0 || !selectedClothing || !selectedGender || !selectedSeason || !selectedType) {
            setError('Please fill all fields');
            return;
        }

        setLoading(true);

        try {
            setError('');
            const result = await editProduct([BigInt(Number(id)), productName, BigInt(price), BigInt(stock), image, selectedGender, selectedSeason, selectedType!, selectedClothing]);
            if (result) {
                Swal.fire({
                    title: "Success!",
                    text: "The product has been successfully updated!",
                    icon: "success"
                })

                setProductName('');
                setPrice(0);
                setStock(0);
                setImage(new Uint8Array());
                setSelectedClothing(undefined);
                setSelectedGender(genderSelection[0]);
                setSelectedSeason(seasonSelection[0]);
                setSelectedType(typeSelection[0]);
                setImageUrl(defaultImage);
                setError('');
                navigate(-1);
            }
        } catch (_) {
            setError('Failed to add product');
        } finally {
            setLoading(false);
        }
    }

    async function fetchProductData() {
        const principal = identity?.getPrincipal();
        if (!principal) return;
        await getProduct([BigInt(Number(id ?? '0')), [principal]]);
    }

    async function updateFormData(product: Product) {
        setProductName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setSelectedClothing(product.clothing);
        setSelectedGender(product.gender);
        setSelectedSeason(product.season);
        setSelectedType(product.clothingType);
        setImageUrl(product.image);
        setImage(await TypeUtils.fetchUint8ArrayFromUrl(product.image) ?? new Uint8Array());
    }

    useEffect(() => {
        if (id) {
            fetchProductData();
        }
    }, [id])

    useEffect(() => {
        if (!product) return;
        if (product.owner !== identity?.getPrincipal().toText()) return;
        updateFormData(product);
    }, [product])

    if (product === undefined) {
        return <div className="flex justify-center text-2xl font-semibold text-gray-700 animate-pulse mt-10">Loading...</div>
    }

    if (product === null) {
        return <div className="flex justify-center text-2xl font-semibold text-gray-700 mt-10">Product not found</div>
    }

    return (
        <div className="my-10 mx-20">
            <div className="flex flex-row items-center mb-10">
                <div className="mr-5">
                    <button className="flex size-6 cursor-pointer items-center justify-center"
                        onClick={() => navigate(-1)}>
                        <IconArrowBack />
                    </button>
                </div>
                <p className="text-3xl">Edit Product Detail</p>
            </div>

            <div className="flex">
                <div className="w-[40%] mr-10">
                    <div className="mb-5 h-full">
                        <img src={imageUrl} className="h-full object-cover"/>
                    </div>
                    <button onClick={handleImage} className="w-full border-black border p-5">Edit Image</button>
                </div>

                <div className="w-full">
                    <div className="space-y-4">
                        <Input label="Product Name" data={productName} inputOnChange={(e) => { setProductName(e.target.value) }} />
                        <Input label="Price" data={price} inputOnChange={(e) => setPrice(Number(e.target.value))} />
                        <Input label="Stock" data={stock} inputOnChange={(e) => setStock(Number(e.target.value))} />
                        <div>
                            <label>Category</label>
                            <CategoryField selectedClothing={selectedClothing} selectedGender={selectedGender} selectedSeason={selectedSeason} selectedType={selectedType}
                                setSelectedClothing={setSelectedClothing} setSelectedGender={setSelectedGender} setSelectedSeason={setSelectedSeason} setSelectedType={setSelectedType}
                            />
                        </div>
                    </div>

                    <p className="text-sm text-red-500 mt-3">{error}</p>

                    { loading ? 
                        <button className="w-full mt-3 p-4 bg-gray-400 text-white font-bold">Loading...</button>
                        :
                        <button onClick={handleSubmit} className="w-full mt-3 p-4 bg-black border-black border text-white">Update Product</button>
                    }
                </div>
            </div>
            <input
                onChange={handleImageChange}
                className="hidden"
                type="file"
                ref={imageInput}
            />
        </div>
    )
}

export default UpdateProduct;