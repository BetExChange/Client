import { test, expect } from '@playwright/test';

test('GET /api/products should return expected product list', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/products');
  expect(response.ok()).toBeTruthy();

  const json = await response.json();

  expect(json).toEqual({
    content: [
      {
        id: 1,
        title: "Product A",
        imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996",
        description: "Description of the product.",
        barcode: 534662326,
        brand: "Brand 1"
      },
      {
        id: 2,
        title: "Product B",
        imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996",
        description: "Description of the product.",
        barcode: 123454545,
        brand: "Brand 2"
      },
      {
        id: 3,
        title: "Product C",
        imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996",
        description: "Description of the product.",
        barcode: 563458985,
        brand: "Brand 3"
      },
      {
        id: 4,
        title: "Product D",
        imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996",
        description: "Description of the product.",
        barcode: 325994746,
        brand: "Brand 4"
      }
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 20,
      sort: {
        sorted: false,
        empty: true,
        unsorted: true
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    totalPages: 1,
    totalElements: 4,
    last: true,
    size: 20,
    number: 0,
    sort: {
      sorted: false,
      empty: true,
      unsorted: true
    },
    numberOfElements: 4,
    first: true,
    empty: false
  });
});
