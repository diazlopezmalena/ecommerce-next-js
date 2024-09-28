import { NextResponse } from "next/server";
import { collection, getDocs, setDoc, doc} from "firebase/firestore";
import { myDB } from "@/app/firebase/config";

export async function GET() {
  const productosRef = collection(myDB, "products");
  const myQuery = productosRef
  const querySnapshot = await getDocs(myQuery);
  const docs = querySnapshot.docs.map((doc) => doc.data());

  return NextResponse.json(docs);
}

// Agregar un nuevo producto
export async function POST(request) {
  try {
    const body = await request.json();
    const productosRef = collection(myDB, "products");
    
    const docRef = doc(productosRef, body.id);

    return NextResponse.json({ message: "Producto agregado", id: body.id });
  } catch (error) {
    console.error("Error al agregar producto:", error); 
    return NextResponse.json({ error: "Error al agregar producto", details: error.message });
  }
}
