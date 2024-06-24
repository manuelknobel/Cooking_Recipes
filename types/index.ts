export interface RecipeModel{
    "creator": number,
    "creationDate": number,
    "name": string,
    "id": number,
    "description": string,
}


export interface IngredientModel{
    "id": number,
    "amount": number,
    "name": "string",
    "unit": number,
    "recipes": number
}