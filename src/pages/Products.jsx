
import { useParams } from "react-router-dom";

import Metadata from "../components/Metadata";
import AmazonName from "../components/AmazonName";
export default function Products() {
  const { productname } = useParams();
  return (
    <div className="container my-3">
         <Metadata title="Deals In America" />
        <AmazonName productname={productname} />
    </div>
  );
}
