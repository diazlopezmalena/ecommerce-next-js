import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { myDB } from "@/app/firebase/config";

export async function GET() {
  const productosRef = collection(myDB, "products");
  const myQuery = productosRef
  const querySnapshot = await getDocs(myQuery);
  const docs = querySnapshot.docs.map((doc) => doc.data());

  return NextResponse.json(docs);
}