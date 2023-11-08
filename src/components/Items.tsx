import { getItemAsset } from '../api/routesApi';

interface ItemData {
  name: string;
}

interface ItemsDatas {
  data: Record<number, ItemData>;
}

type ItemProps = {
  item: number;
  itemsDatas: ItemsDatas;
  victory: boolean;
};

export default function ItemImages({ item, itemsDatas, victory }: ItemProps) {
  return item ? (
    <img
      className={`h-10 w-10 border-solid border-2 rounded-lg ${
        victory
          ? 'border-mint-5 dark:border-mintdark-5'
          : 'border-red-5 dark:border-reddark-5'
      }`}
      src={getItemAsset(item)}
      alt={'Item asset ' + itemsDatas?.data[item]?.name}
      title={itemsDatas?.data[item]?.name}
    />
  ) : (
    <div
      className={`h-10 w-10 border-solid border-2 rounded-lg ${
        victory ? 'bg-mint-5 dark:bg-mintdark-5' : 'bg-red-5 dark:bg-reddark-5'
      }`}
    ></div>
  );
}
