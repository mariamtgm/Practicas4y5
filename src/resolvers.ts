import { typeDefs } from './schema';

const recipeData = [];
const userData = [];
const ingredientData = [];

const resolvers = {
    Ingredient: {
        recipes: (parent, args, ctx, info) => {
            const result = parent.recipes.map(elem => {
                const recipeInfo = recipeData.find(obj => obj.id === elem);
                return recipeInfo;
            })
            return result;
        }
    },

    Recipe: {
        user: (parent, args, ctx, info) => {
            const userID = parent.user;
            const result = userData.find(obj => obj.id === userID);
            return result;
        },
        
        ingredients: (parent, args, ctx, info) => {
            const result = parent.ingredients.map(elem => {
                const ingredientInfo = ingredientData.find(obj => obj.id === elem);
                return ingredientInfo;
            })
            return result;
        }
    },

    User: {
        recipes: (parent, args, ctx, info) => {
            const userID = parent.id;
            return recipeData.filter(obj => obj.author === userID);
        }
    },

    Query: {
        getRecipes: (parent: any, args: any, { recipes, ingredients}) => {
            return recipes.map((r, index) => ({
                ...r,
                id: index,
            }));
        },

        getRecipe: (_, {id}, { recipes, ingredients }) => {
            return {
                ...recipes[id],
                id,
            }
        },

        getUser: (_, {id}, { users, email }) => {
            return {
                ...users[id],
                id,
            }
        },

        getUsers: (parent: any, args: any, { users, email}) => {
            return users.map((r, index) => ({
                ...r,
                id: index,
            }));
        }
    },

    Mutation: {

        signIn: (parent, args, ctx, info) => {
            const {id, email, pwd, token} = args;
            if (userData.some(obj => obj.email === email)){
                return resolvers.sendStatus(403).send(`${email} already in use`);
            }

            const recipes = [];

            const author = {
                id,
                email,
                pwd,
                token,
                recipes
            }

            userData.push(author);
            return author;
        },

        signOut: (parent, args, ctx, info) => {
            const {id} = args;
            if (!userData.some(obj => obj.id === id)){
                return resolvers.sendStatus(403).send(`${id} does not exist`);
            }

            const userObject = userData.find(obj => obj.id === id);

            userData.splice(userData.indexOf(userObject), 1);

            const recipeObject = recipeData.find(obj => obj.author === id);
            
            if(recipeObject){
                recipeData.splice(recipeData.indexOf(recipeObject), 1);
            }

            return `User removed`;
        },

        addIngredient: (parent, args, ctx, info) => {
            const {name} = args;
            if (ingredientData.some(obj => obj.name === name)){
                return resolvers.sendStatus(403).send(`${name} ingredient already exist`);
            }

            const recipes = [];

            const ingredient = {
                id,
                name,
                recipes
            }

            ingredientData.push(ingredient);
            return ingredient;
        },

        deleteIngredient: (parent, args, ctx, info) => {
            const {name} = args;
            if (!ingredientData.some(obj => obj.name === name)){
                return resolvers.sendStatus(403).send(`${name} does not exist`);
            }

            const ingredientObject = ingredientData.find(obj => obj.name === name);
            
            ingredientData.splice(recipeData.indexOf(ingredientObject), 1);

            return `Recipe removed`;
        },

        addRecipe: (parent, args, ctx, info) => {
            const {name, description, ingredients, author} = args;
            if (recipeData.some(obj => obj.name === name)){
                return resolvers.sendStatus(403).send(`${name} already exist`);
            }

            const recipe = {
                id,
                name,
                description,
                ingredients,
                author,
            }

            const authorObject = userData.find(obj => obj.id === author);
            authorObject.recipes.push(id);
            ingredients.map(elem => {
                const ingredientInfo = ingredientData.find(obj => obj.id === elem);
                ingredientInfo.recipes.push(id);
            })

            recipeData.push(recipe);
            return recipe;
        },

        updateRecipe: (parent, args, ctx, info) => {
            const {id, name, description, ingredients, author} = args;
            if (!recipeData.some(obj => obj.id === id)){
                return resolvers.sendStatus(403).send(`${id} does not exist`);
            }

            const recipeObject = recipeData.find(obj => obj.id === id);
 
            recipeObject.name = name;
            recipeObject.description = description;
            recipeObject.author = author;
            recipeObject.ingredients = ingredients;

            return recipeObject;
        },

        deleteRecipe: (parent, args, ctx, info) => {
            const {id} = args;
            if (!recipeData.some(obj => obj.id === id)){
                return resolvers.sendStatus(403).send(`${id} does not exist`);
            }

            const recipeObject = recipeData.find(obj => obj.id === id);
            
            recipeData.splice(recipeData.indexOf(recipeObject), 1);

            return `Recipe removed`;
        }
    }
}