export const genderSelection = [
    "Male",
    "Female"
] as const;

export const seasonSelection = [
    "Summer",
    "Fall",
    "Spring",
    "Winter"
] as const;

export const typeSelection = [
    "Top",
    "Bottom",
    "Outerwear",
    "Accessories"
] as const;

const topSelection = [
    "T-Shirt",
    "Shirt",
    "Long Sleeve",
    "Short Sleeve"
] as const;

const bottomSelection = [
    "Pants",
    "Short",
    "Skirt"
] as const;

const outerwearSelection = [
    "Coat",
    "Cardigan"
] as const;

const accessoriesSelection = [
    "Hat",
    "Glasses",
    "Watch"
] as const;

export type Gender = typeof genderSelection[number];
export type Season = typeof seasonSelection[number];
export type ClothingType = typeof typeSelection[number];
type Top = typeof topSelection[number];
type Bottom = typeof bottomSelection[number];
type Outerwear = typeof outerwearSelection[number];
type Accessories = typeof accessoriesSelection[number];

type ClothingSelections = {
    Top: ReadonlyArray<Top>,
    Bottom: ReadonlyArray<Bottom>,
    Outerwear: ReadonlyArray<Outerwear>,
    Accessories: ReadonlyArray<Accessories>
};

export const clothingSelections: ClothingSelections = {
    "Top": topSelection,
    "Bottom": bottomSelection,
    "Outerwear": outerwearSelection,
    "Accessories": accessoriesSelection
}