import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RegisterCard from "./registerCard";
import UpdateCard from "./updateCard";
import UpdateStatus from "./updateStatus";

export function AccordionForm() {
  return (
    <Accordion
      type="single"
      collapsible
      className="text-white flex justify-center items-start gap-44 mt-10"
    >
      <AccordionItem value="item-1" className="w-96">
        <AccordionTrigger>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
            Register Agent
          </h3>
        </AccordionTrigger>
        <AccordionContent className="flex">
          <RegisterCard />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="w-96">
        <AccordionTrigger>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
            Update Agent
          </h3>
        </AccordionTrigger>
        <AccordionContent>
          <UpdateCard />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="w-96">
        <AccordionTrigger>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
            Update status
          </h3>
        </AccordionTrigger>
        <AccordionContent>
          <UpdateStatus />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
