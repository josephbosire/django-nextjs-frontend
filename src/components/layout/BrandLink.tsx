import React from "react";
import Link from "next/link";
import { Package2 } from "lucide-react";

type BrandProps = {
  className?: string;
  displayName?: boolean;
};

const BrandLink = ({ className, displayName }: BrandProps) => {
  const finalClassName = className
    ? className
    : "flex items-center gap-2 text-lg font-semibold md:text-base";
  return (
    <Link href="/" className={finalClassName}>
      <Package2 className="h-6 w-6" />
      {displayName ? <span>Saas</span> : <span className="sr-only">Saas</span>}
    </Link>
  );
};
export default BrandLink;
