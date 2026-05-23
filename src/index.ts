import dotenv from "dotenv";
dotenv.config();
import { updateFinancial } from "./scripts/updateFinancial.js";

console.log("============ Script Started ============");

// OPTIMIZED TO FETCH US AND BRAZILIAN STOCK AND FII (ONLY BRAZILIAN).
await updateFinancial();

console.log("============ Script Completed ============");
