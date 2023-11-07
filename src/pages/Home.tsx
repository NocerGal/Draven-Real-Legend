import FormSearchPlayer from '../components/FormSearchPlayer';

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto flex col-auto">
      <div className="flex gap-8 flex-col items-start justify-center align-top my-14 mt-32 w-full px-14 md:flex-row">
        <div className="flex gap-7 flex-col h-full w-full md:w-1/2 align-middle">
          <div className="">
            <h1 className="text-5xl bg-gradient-to-br from-blue-9 to-blue-12 bg-clip-text text-transparent font-bold pb-6 dark:from-blue-2 dark:to-blue-7">
              Draven the Real Legend
            </h1>
            <p className="text-blue-12 text-xl dark:text-bluedark-12">
              The website that loves itself, likes its visitors a little, but
              has a fondness for LoL
            </p>
          </div>
          <div>
            <FormSearchPlayer label="Tape your summoner name and select your region" />
          </div>
        </div>
      </div>
    </div>
  );
}
