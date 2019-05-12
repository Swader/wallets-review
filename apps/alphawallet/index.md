# AlphaWallet

AlphaWallet bills itself as the "No nonsense" wallet and in some regards, it's right. It's simple, straightforward, minimalistic. But once you scrape the surface, it starts looking less appealing than promised.

The wallet was originally forked from [Trust Wallet](https://wallets.review/apps/trust/) with many parts completely revamped in the meanwhile to suit a different kind of audience. Rather than focus on multi-chain support and versatility, AlphaWallet went with collectibles like tickets, CryptoKitties and more - and of course the usual Ether and tokens.

The application isn't that hard to stop because it depends on Infura as its node endpoint. Take down Infura and the app stops working, especially given that one cannot enter a custom node address to use. AlphaWallet also depends on some external price providers which seem vulnerable, but probably won't break the app if they disappear.

> The UX can be classified as failing and stability as in-development.

## UX and Dapps

From a UX perspective, AlphaWallet is okay for the most basic of uses, but doesn't shine. The dapp browser is very basic, allowing you to bookmark favorites and visit dapps as you would in any browser.

The main interface is simple and clean with clearly separated collectibles and fungibles and a common screen for a total overview of a given wallet. The interface to add other assets like custom tokens, however, isn't that simple - adding even the most popular coins requires knowing their address from which the wallet will then extract the needed decimals, name and ticket symbol. However, there is no verification going on so anyone can add any token that's a fake clone of another and the wallet wouldn't know because it has no predefined whitelist.

The custom token you add - no matter how popular - will only appear in your list once you have received at least some of that token. You cannot show a balance of 0. The good news is that you can add virtually any custom token.

![Custom tokens](/apps/alphawallet/swader.png)

The app keeps crashing, mostly when scanning QR codes which it only marginally supports.

![Crashing](/apps/alphawallet/crash.jpg)

For example, it doesn't process EIP-831 prefixes, so prefixing an address with "pay" in a QR code will have the app load it, but then crash to main screen when it tries to send - it doesn't do any input validation to make sure an address is fine. It also doesn't support ERC-681, most notably it flat out ignores the `&amount` param and instead prefers `&value`.

Because of this, the UX can be classified as failing and stability as in-development versus stable, despite it advertising itself as such.

> AlphaWallet does not secure wallets at al

## Multi-account support

AlphaWallet only allows import by private key or keystore which means it ignores derivation path altogether. Switching accounts is very easy, one needs to open the settings and go to My Wallets where they're all listed and easily clickable.

The transactions and balance are then shown on individual wallet screens, with no common screen for all.

It should be noted that AlphaWallet does not secure wallets at all - it does not encrypt the keystore with a password. There is no way to add a password or a fingerprint.

AlphaWallet does not properly inject Web3 so many dapps do not recognize it, but when they do, the identity is immediately switched on wallet switch.

This application also has a pretty serious privacy leak in that it does not clear browser cache when you change identity, meaning your previous visits can be logged and your various identities linked.

> In the unlikely case that Infura goes down, so does this wallet

## DX

There is no way to add a custom node, which means that in the unlikely case that Infura goes down, so does this wallet. Several testnets are supported out of the box, but this is meaningless when one cannot do real, local testing or run the app on private blockchains.

Custom tokens are fully supported.

> The user owns their keys and they stay on the device.

## Security and Safety

There is no KYC and the app is made for both Android and iOS which increases its reach. It's open source so a user is able to inspect how the app treats their keys and whether they are sent anywhere. As such, the user owns their keys and they stay on the device.

The real problem is that AlphaWallet does not allow for even password based security, let alone hardware or biometric. A once set up instance of AlphaWallet will remain open to anyone accessing the device, and there is no way to secure it. This alone is a dealbreaker for many.

> AlphaWallet's approach to uniqueness is admirable, but maybe should be prioritized after the app is made stable.

## Other Considerations

The author of AlphaWallet seems to have an agenda that doesn't run parallel with building an excellent application. He is more interested in pushing "protocols" - special network-level upgrades to AlphaWallet that let one do things that other wallets can't. For example, the author's proposed EIP-875 is a standard for bulk sending of tokens. As AlphaWallet is marketed as a good fit for event tickets, this would fit perfectly into that story arc - bulk batches of tickets (each of which is an NFT) and sell them one by one or batch by batch, saving on fees and block times.

Blockchain Attestations are another interesting aspect being developed as native to AlphaWallet while EIPs related to them are waiting for comments. These let attesters (witnesses) cryptographically sign documents, data, claims, transactions and more and let external parties verify those claims without revealing the claims' data to the wider public.

This approach to uniqueness is admirable, but maybe should be prioritized after the app is made stable.

> I would not feel safe using AlphaWallet.

## Conclusion

AlphaWallet seems like someone's hobby project that was never supposed to make it to production. It's lacking some essential security features and despite it being open source I would not feel safe using it. It relies on central points of failure and offers nothing others don't already offer.

I cannot recommend AlphaWallet at this time, but will be keeping an eye on it. AlphaWallet's special bulk-sending and attestation features do make it stand out, but it feels like a person standing up in a room of sitters, only that person is naked. Put some clothes on first, man.