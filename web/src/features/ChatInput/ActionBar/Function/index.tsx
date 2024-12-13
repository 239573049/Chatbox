import { ActionIcon } from "@lobehub/ui";
import { memo } from "react";
import { Blocks } from "lucide-react";
import DropdownMenu from "./Dropdown";

const Function = memo(() => {
  return  <DropdownMenu>
  <ActionIcon
    icon={Blocks}
    placement={'bottom'}
    title={'函数'}
  />
</DropdownMenu>
});

export default Function;
