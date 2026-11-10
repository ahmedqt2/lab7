1. State choices. The user goes in Context and the cart goes in Zustand becuase several components need them. The filters go in the URL so a shared link keeps them, and the product list stays in the page's `useFetch` state. The theme stays in the layout and gets saved to `localStorage` so it survives a refesh.

2. Context vs Zustand. Login only changes when someone signs in or out, so Context is enogh. The cart changes more often, and Zustand lets the navbar read just the item count. A cart Context would update all its consumers when the value changes, while Zustand would add a seperate store for login.

3. What `useFetch` shares. Both product pages use the same loading, error, and cancellation logic. Each page still has its own request and data.

4. Product ID type. `useParams` gives the ID as a string. I use it in the request URL and pass it to `useFetch` so changing it loads a diferent product.

5. Protected route. It just redirects signed-out users in the broswer. Real security needs a server to check the user's session and permisions before sending private data.

6. Refreshing a link. On a static server without a fallback, `/products/3` can return a 404. The Vite dev server sends `index.html` by defualt, then React Router opens the product page.


## Challenges

The tricky part was swiching products while the old request was still loading. I used `AbortController` to cancel it when the product ID changes.