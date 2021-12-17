import { ApolloServer } from "apollo-server";
import { connectDB } from "./mongo";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers"
import { ApolloError } from "apollo-server";

const Recetas = [
    {name: "paella", ingredientes: [0, 1, 2]},
    { name: "lentejas", ingredientes: [4, 3] },
    { name: "cocido", ingredientes: [1, 2, 5] }
]

const Ingredientes = ["arroz", "sopa", "garbanzos"];

const run = async () => {
    const db = await connectDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {
            const reqAuth = ["updateRecipe", "deleteRecipe"];
            if (reqAuth.some(auth => req.body.query.includes(auth)){
                const token = req.headers.authtoken;
                const user = await db.collection("Useres").findOne({ token: token });
                if (!user) throw new ApolloError("Not authorized", "403");
                return {
                    db,
                    user
                }
                return {
                    db
                }
            }
        }
    }
}