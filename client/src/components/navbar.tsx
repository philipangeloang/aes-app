/* eslint-disable @typescript-eslint/no-unused-vars */
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SECRET } from "@/graphql/mutations";
import { GET_SECRETS } from "@/graphql/queries";
import { Toaster } from "./ui/toaster";

const Navbar = () => {
  const { toast } = useToast();
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");

  const [addSecret] = useMutation(ADD_SECRET);

  function handleSubmit() {
    if (secret === "" || password === "") {
      return toast({
        title: "Cannot be Empty",
        description: "Please fill up the empty fields",
        duration: 3000,
      });
    }
    addSecret({
      variables: {
        secret: {
          secret: secret,
          password: password,
        },
      },
      refetchQueries: [{ query: GET_SECRETS }],
    });

    setSecret("");
    setPassword("");
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 absolute w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            HAES
          </span>
        </a>
        <Toaster />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700 hover:bg-blue-800">+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px]">
              <DialogHeader>
                <DialogTitle>Add Secret</DialogTitle>
                <DialogDescription>Input secret and password</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Secret
                  </Label>
                  <Input
                    id="secret"
                    className="col-span-3"
                    defaultValue={""}
                    value={secret}
                    onChange={(e) => {
                      setSecret(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    defaultValue={""}
                    value={password}
                    className="col-span-3"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
