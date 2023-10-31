import DRAVEN_IMG from '../assets/Draven_6.jpg';
import * as Form from '@radix-ui/react-form';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto flex col-auto ">
      <div className="flex gap-8 flex-col items-start justify-center align-top my-14 mt-32 w-full px-14 md:flex-row">
        <div className="flex gap-4 flex-col h-full w-1/2 align-middle">
          <div className="">
            <h1 className="text-5xl bg-gradient-to-br from-blue-9 to-blue-12 bg-clip-text text-transparent font-bold pb-4 dark:from-blue-2 dark:to-blue-7 ">
              Draven the Real Legend
            </h1>
            <p className="text-blue-12 text-xl dark:text-bluedark-12">
              The website that loves itself, likes its visitors a little, but
              has a fondness for LoL
            </p>
          </div>
          <div>
            <FindPlayerForm label="player" />
          </div>
        </div>
        <img
          className="h-96 w-96"
          src={DRAVEN_IMG}
          alt="image de draven"
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
    </div>
  );
}

type FindPlayerFormProps = {
  label: string;
};

function FindPlayerForm({ label }: FindPlayerFormProps) {
  return (
    <Form.Root className="FormRoot">
      <Form.Field className="FormField" name={label}></Form.Field>
    </Form.Root>
  );
}
