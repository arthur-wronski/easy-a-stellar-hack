import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FundProgress } from "./FundProgress";
import { EarnCards } from "./EarnCards";


export function TabMenu() {
  return (
    <Tabs defaultValue="earn" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="online">Earn Online</TabsTrigger>
        <TabsTrigger value="local">Earn Locally</TabsTrigger>
        <TabsTrigger value="fund">Fund</TabsTrigger>
      </TabsList>

      <TabsContent value="online">
        <div className="mt-4 mb-6 text-lg font-semibold text-center">
          Earn XLM Tokens Through Sustainable Choices
        </div>
        <EarnCards/>
      </TabsContent>
      <TabsContent value="local">
        <div className="mt-4 mb-6 text-lg font-semibold text-center">
          Get discounts and rewards
        </div>
        <EarnCards/>
      </TabsContent>

      <TabsContent value="fund">
        <div className="mt-4 mb-6 text-lg font-semibold text-center">
          Fund green projects
        </div>
        <FundProgress/>
      </TabsContent>
    </Tabs>
  );
}
