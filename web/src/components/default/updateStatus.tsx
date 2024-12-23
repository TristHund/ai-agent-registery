import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

export default function UpdateStatus() {
  return (
    <div>
      <Card className="w-[380px] mt-4">
        <CardHeader>
          <CardTitle>Agent Status</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">New status</Label>
                <Input id="name" placeholder="Status of your agent" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="agentAccount">Agent account Details</Label>
                <Input
                  id="agentAccount"
                  placeholder="Specify account details"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userAccount">User account details</Label>
                <Input id="userAccount" placeholder="Specify account details" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
