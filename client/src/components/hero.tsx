/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@apollo/client";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";

import { GET_SECRETS } from "@/graphql/queries";

const Hero = () => {
  const { data } = useQuery(GET_SECRETS);

  return (
    <section className="bg-white dark:bg-gray-900 pt-20 h-screen">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-8 lg:py-16 lg:grid-cols-12">
        {data?.secrets.map((item: any) => (
          <Card className="col-span-3">
            <CardHeader>
              <CardDescription>{item.secret}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Drawer>
                <DrawerTrigger>
                  <Button className="bg-blue-700 hover:bg-blue-800">
                    Open Secret
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Secret</DrawerTitle>
                      <DrawerDescription>
                        Input password to reveal secret
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <Input placeholder="password" type="password" />
                    </div>
                    <DrawerFooter>
                      <Button className="bg-blue-700 hover:bg-blue-800">
                        Reveal
                      </Button>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Hero;
