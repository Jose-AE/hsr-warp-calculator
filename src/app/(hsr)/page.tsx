import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Tooltip from "@/components/Tooltip";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center m-2">
      <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 my-12 space-y-4">
        <Title text="Settings" icon="/hsr/warp.png" />

        <section className="flex gap-5">
          <Input
            label="Warps"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Input
            label="Simulations"
            type="number"
            placeholder="0"
            autoComplete="off"
          />
        </section>

        <Title text="Character" icon="/hsr/char.png" />

        <section className="flex gap-5">
          <Input
            label="Banner Pity"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Input
            label="Wanted Copies"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Checkbox text="Guaranteed" />
        </section>

        <Title text="Light Cone" icon="/hsr/lc.png" />

        <section className="flex gap-5">
          <Input
            label="Banner Pity"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Input
            label="Wanted Copies"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Checkbox text="Guaranteed" />
        </section>

        <div className="space-y-6">
          <Button>Calculate</Button>
        </div>

        <div className="p-5 border border-gray-600 rounded-md w-full flex-col flex items-center justify-center">
          <span className=" mb-3 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-green-600/30 text-green-500">
            76%
          </span>

          <p className="mr-2 ">
            Is the probability of you obtaining 1 copie(s) of the character from
            the featured banner and 1copie(s) of the light cone in the featured
            banner if you were to do 1 warp(s), first starting in the character
            banner until you get all desired copies and then moving to the light
            cone banner
          </p>
        </div>
      </div>
    </main>
  );
}
