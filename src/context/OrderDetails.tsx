import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRICE_PER_ITEM } from '../constants';
import { formatCurrency } from '../util';

interface OrderDetailsCounts {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
  totals: OptionTotals;
}

interface UpdateItemCountFunc {
  (
    itemName: string,
    newItemCount: string,
    optionType: 'scoops' | 'toppings',
  ): void;
}

interface ResetOrderFunc {
  (): void;
}

interface OrderDetailsProviderProps {
  children: React.ReactNode;
  value?: [OrderDetailsCounts, UpdateItemCountFunc, ResetOrderFunc];
}

interface OptionCountNumber {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
}

interface OptionTotals {
  scoops: string;
  toppings: string;
  grandTotal: string;
}

type OptionDetailsContext = [
  OrderDetailsCounts,
  UpdateItemCountFunc,
  ResetOrderFunc,
];

const OrderDetails = createContext<OptionDetailsContext>([
  {} as OrderDetailsCounts,
  () => {},
  () => {},
]);

// create custom hook to check whether we're inside a provider
const useOrderDetails = (): OptionDetailsContext => {
  const context = useContext(OrderDetails);

  if (context === undefined) {
    throw new Error(
      'useOrderDetails must be used within a OrderDetailsProvider',
    );
  }

  return context;
};

const OrderDetailsProvider = (
  props: OrderDetailsProviderProps,
): JSX.Element => {
  const [optionCounts, setOptionCounts] = useState<OptionCountNumber>({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState<OptionTotals>({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  const calculateSubtotal = (
    orderType: string,
    count: Map<string, number>,
  ): number => {
    let optionCount = 0;
    count.forEach((value) => {
      optionCount += value;
    });
    return optionCount * PRICE_PER_ITEM[orderType as 'scoops' | 'toppings'];
  };

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts.scoops);
    const toppingsSubtotal = calculateSubtotal(
      'toppings',
      optionCounts.toppings,
    );
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo((): OptionDetailsContext => {
    const resetOrder = (): void => {
      setOptionCounts({
        scoops: new Map<string, number>(),
        toppings: new Map<string, number>(),
      });
    };

    const updateItemCount = (
      itemName: string,
      newItemCount: string,
      optionType: 'scoops' | 'toppings',
    ): void => {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = newOptionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };

    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return (
    <OrderDetails.Provider value={value}>
      {props.children}
    </OrderDetails.Provider>
  );
};

export { OrderDetailsProvider, useOrderDetails };
