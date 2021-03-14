import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CURRENCY_NAMES } from 'appConstants/currencyNames';

type CurrencyRateViewProps = {
  countryCurrency: string;
  rates: [string, number][];
  lang: string;
};

function createData(rate: number, currencyCode: string) {
  return { rate, currencyCode };
}

function createRows(ratesList: [string, number][]) {
  return ratesList.map((rate) => createData(rate[1], rate[0]));
}

export const CurrencyRateView: FC<CurrencyRateViewProps> = ({
  countryCurrency,
  rates,
  lang,
}) => {
  const rows = createRows(rates);

  return (
    <Table aria-label="currency rate table">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={2}>
            <div>{`1 ${countryCurrency}`}</div>
            <div>{`(${CURRENCY_NAMES[countryCurrency][lang]})`}</div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.currencyCode}>
            <TableCell component="th" scope="row" align="right">
              {row.rate}
            </TableCell>
            <TableCell title={CURRENCY_NAMES[row.currencyCode][lang]}>
              {row.currencyCode}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
