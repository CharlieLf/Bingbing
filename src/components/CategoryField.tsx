import { useEffect, useState } from "react";
import ButtonSmall from "./ButtonSmall";

const CategoryField: React.FC = () => {
    const [selectedGender, setSelectedGender] = useState<string>("");
    const [selectedSeason, setSelectedSeason] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedTop, setSelectedTop] = useState<string>("");
    const [selectedBottom, setSelectedBottom] = useState<string>("");
    const [selectedOuterwear, setSelectedOuterwear] = useState<string>("");
    const [selectedAccessories, setSelectedAccessories] = useState<string>("");

    useEffect(()=>{
        console.log(selectedGender)
    })

    return(
        <div className="space-y-3">
            <div className="space-x-2">
                <ButtonSmall text="Male" onclick={() => {setSelectedGender("male")}} variant={selectedGender === "male" ? "primary" : "secondary"}/>
                <ButtonSmall text="Female" onclick={() => {setSelectedGender("female")}} variant={selectedGender === "female" ? "primary" : "secondary"}/>
            </div>

            <div className="space-x-2">
                <ButtonSmall text="Summer" onclick={() => {setSelectedSeason("summer")}} variant={selectedSeason === "summer" ? "primary" : "secondary"}/>
                <ButtonSmall text="Fall" onclick={() => {setSelectedSeason("fall")}} variant={selectedSeason === "fall" ? "primary" : "secondary"}/>
                <ButtonSmall text="Spring" onclick={() => {setSelectedSeason("spring")}} variant={selectedSeason === "spring" ? "primary" : "secondary"}/>
                <ButtonSmall text="Winter" onclick={() => {setSelectedSeason("winter")}} variant={selectedSeason === "winter" ? "primary" : "secondary"}/>

            </div>

            <div className="space-x-2">
                <ButtonSmall text="Top" onclick={() => {setSelectedType("top")}} variant={selectedType === "top" ? "primary" : "secondary"}/>
                <ButtonSmall text="Bottom" onclick={() => {setSelectedType("bottom")}} variant={selectedType === "bottom" ? "primary" : "secondary"}/>
                <ButtonSmall text="Outerwear" onclick={() => {setSelectedType("outerwear")}} variant={selectedType === "outerwear" ? "primary" : "secondary"}/>
            </div>

            {selectedType === "top" && 
                <div className="space-x-2">
                    <ButtonSmall text="T-Shirt" onclick={() => {setSelectedTop("t-shirt")}} variant={selectedTop === "t-shirt" ? "primary" : "secondary"}/>
                    <ButtonSmall text="Shirt" onclick={() => {setSelectedTop("shirt")}} variant={selectedTop === "shirt" ? "primary" : "secondary"}/>
                    <ButtonSmall text="Long Sleeve" onclick={() => {setSelectedTop("longsleeve")}} variant={selectedTop === "longsleeve" ? "primary" : "secondary"}/>
                    <ButtonSmall text="Short Sleeve" onclick={() => {setSelectedTop("shortsleeve")}} variant={selectedTop === "shortsleeve" ? "primary" : "secondary"}/>
                </div>
            }

            {selectedType === "bottom" && 
                <div className="space-x-2">
                    <ButtonSmall text="Pants" onclick={() => {setSelectedBottom("male")}} variant={selectedBottom === "male" ? "primary" : "secondary"}/>
                    <ButtonSmall text="Short" onclick={() => {setSelectedGender("male")}} variant={selectedBottom === "male" ? "primary" : "secondary"}/>
                    
                    {selectedGender === "female" && 
                        <ButtonSmall text="Skirt" onclick={() => {setSelectedBottom("skirt")}} variant={selectedBottom === "skirt" ? "primary" : "secondary"}/>
                    }
                </div>
            }

            {selectedType === "outerwear" && 
                <div className="space-x-2">
                    <ButtonSmall text="Coat" onclick={() => {setSelectedOuterwear("coat")}} variant={selectedAccessories === "coat" ? "primary" : "secondary"}/>
                    <ButtonSmall text="Cardigan" onclick={() => {setSelectedOuterwear("cardigan")}} variant={selectedAccessories === "cardigan" ? "primary" : "secondary"}/>
                </div>
            }

            {selectedType === "accessories" && 
                <div className="space-x-2">
                    <ButtonSmall text="Hat" onclick={() => {setSelectedAccessories("Hat")}} variant={selectedAccessories === "hat" ? "primary" : "secondary"}/>
                    <ButtonSmall text="Shoes" onclick={() => {setSelectedAccessories("Shoes")}} variant={selectedAccessories === "shoes" ? "primary" : "secondary"}/>
                    <ButtonSmall text="Belt" onclick={() => {setSelectedAccessories("Belt")}} variant={selectedAccessories === "belt" ? "primary" : "secondary"}/>
                    <ButtonSmall text="Bag" onclick={() => {setSelectedAccessories("Bag")}} variant={selectedAccessories === "bag" ? "primary" : "secondary"}/>
                </div>
            }
        </div>
    )
}

export default CategoryField;
