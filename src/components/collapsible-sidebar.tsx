import { ChevronsUpDownIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Badge } from "./ui/badge";
import Link from "next/link";

export type SubcategoryItem = {
  name: string;
  href: string;
};

type props = {
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subcategories: SubcategoryItem[];
};

const CollapsibleSidebar = ({
  isOpen,
  title,
  onOpenChange,
  subcategories,
}: props) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="bg-secondary flex w-full items-center justify-between rounded-sm px-2 py-1">
        <h3 className="text-base font-semibold">{title}</h3>
        <ChevronsUpDownIcon className="h-4 w-4 cursor-pointer" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 flex flex-col gap-2 pl-2">
        {subcategories.map((item) => (
          <Link key={item.name} href={item.href} className="">
            <Badge variant={"outline"} className="font-medium">
              {item.name}
            </Badge>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSidebar;
