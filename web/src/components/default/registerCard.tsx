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

export default function RegisterCard() {
  return (
    <div>
      <Card className="w-[380px] mt-4">
        <CardHeader>
          <CardTitle>Agent Details</CardTitle>
          <CardDescription>Specify your agent details</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your agent" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Description</Label>
                <Textarea
                  placeholder="Provide a description for your agent"
                  id="message"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pubkey">Agent Public key</Label>
                <Input id="pubkey" placeholder="Enter agent's public key" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
          <CardDescription>Specify account information</CardDescription>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="programID">Program ID</Label>
                <Input id="programID" placeholder="Enter program ID" />
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
