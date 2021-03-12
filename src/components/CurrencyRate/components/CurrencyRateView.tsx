import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CURRENCY_MAP } from 'appConstants/currencyMap';

type CurrencyRateViewProps = {
  currentCountry: string;
  rates: [string, number][];
};

function createData(rate: number, currencyCode: string) {
  return { rate, currencyCode };
}

function createRows(ratesList: [string, number][]) {
  return ratesList.map((rate) => createData(rate[1], rate[0]));
}

export const CurrencyRateView: FC<CurrencyRateViewProps> = ({
  currentCountry,
  rates,
}) => {
  const rows = createRows(rates);

  return (
    <Table aria-label="currency rate table">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={2}>
            {`1 ${CURRENCY_MAP[currentCountry]} =`}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.currencyCode}>
            <TableCell component="th" scope="row" align="right">
              {row.rate}
            </TableCell>
            <TableCell>{row.currencyCode}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
