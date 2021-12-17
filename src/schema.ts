import { gql } from 'apollo-server'


export const typeDefs = gql`
    type Ingredient{
        id: ID!
        name: String!
        recipes: [Recipe!]!
    }

    type Recipe{
        id: ID!
        name: String!
        description: String!
        ingredients: [Ingredient!]!
        author: User!
    }

    type User{
        id: ID!
        email: String!
        pwd: String!
        token: String
        recipes: [Recipe!]!
    }

    type Query {
        getRecipes: [Recipe]!
        getRecipe(id: ID!): Recipe!
        getUser(id: ID!): User!
        getUsers: [User]!
    }

    input IngredientAmountInput{
        ingredient: String!
        amount: int!
    }

    input RecipeInput{
        title: String!
        description: String!
        ingredient: [IngredientAmountInput!]!
    }

    type Mutation{
        signIn(id: ID!, pwd: String!): User!
        signOut(id: ID!): String!
        logIn(id: ID!, pwd: String!): User!
        logOut(id: ID!): String!
        addIngredient(name: String!): Ingredient!
        deleteIngredient(name: String!): String!
        addRecipe(recipe: RecipeInput): Recipe!
        updateRecipe(id: ID!, recipe: RecipeInput!): Recipe!
        deleteRecipe(id: ID!): String!
    }
`