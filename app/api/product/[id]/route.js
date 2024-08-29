import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { myDB } from "@/app/firebase/config";

export async function GET(request, { params }) {
  const { id } = params;

  const productosRef = collection(myDB, "products");

  const myQuery = query(productosRef, where("id", "==", id));
  const querySnapshot = await getDocs(myQuery);
  const docs = querySnapshot.docs.map((doc) => doc.data());

  return NextResponse.json(docs);
}
