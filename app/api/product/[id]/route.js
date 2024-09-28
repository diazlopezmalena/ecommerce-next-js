import { NextResponse } from "next/server";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { myDB } from "@/app/firebase/config";

export async function GET(request, { params }) {
  const { id } = params;

  const productosRef = collection(myDB, "products");

  const myQuery = query(productosRef, where("id", "==", id));
  const querySnapshot = await getDocs(myQuery);
  const docs = querySnapshot.docs.map((doc) => doc.data());

  return NextResponse.json(docs);
}

//Modificar
export async function PUT(request, { params }) {
  const { id } = params;
  
  try {
    const body = await request.json(); 
    const productRef = doc(myDB, "products", id); 

    await updateDoc(productRef, { stock: body.stock });

    return NextResponse.json({ message: "Producto actualizado" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    return NextResponse.json({ error: "Error al actualizar el producto", details: error.message });
  }
}
