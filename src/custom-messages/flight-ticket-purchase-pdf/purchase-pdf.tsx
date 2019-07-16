import React from 'react';

import {
  Document,
  Page,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

export default function PurchasePdf(
  {
    date,
    price,
    tax,
    amount,
  }
  :
  {
    date: string
    price: string
    tax: string
    amount: string
  }
) {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ Created with react-pdf ~
        </Text>
        <Text style={styles.title}>e-ticket of your flight plan</Text>
        <Text style={styles.subtitle}>
          Data
        </Text>
        <Text style={styles.text}>
          {date}
        </Text>

        <Text style={styles.subtitle}>
          Price
        </Text>
        <Text style={styles.text}>
          {price}
        </Text>

        <Text style={styles.subtitle}>
          Tax
        </Text>
        <Text style={styles.text}>
          {tax}
        </Text>

        <Text style={styles.subtitle}>
          Total
        </Text>
        <Text style={styles.text}>
          {amount}
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )}
          fixed
        />
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textAlign: 'center',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
