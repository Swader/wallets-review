# Multi-account features in mobile cryptocurrency wallets

What follows is an exploration of multi-account features offered by various mobile cryptocurrency wallets. Individual wallets will be explored and a final conclusion and abstraction of the data will follow.

## Wallets

### Trust Wallet

Trust Wallet's multi-account feature fully separates balances and transactions per account, generating a new recovery phrase rather than opting for a different derivation path. This is because the wallet is multi-blockchain and some blockchains do not support derivation paths. The wallets cannot be individually secured, so they are in effect the identities of the user more than separate users.

Each account starts with a default list of tokens - Bitcoin, Ethereum and Binance, and can add as many as they wish, including custom ERC20 tokens.

The derivation path cannot be customized in the wallet itself. If you generate the Ethereum wallet externally and send some ether to a path other than the default `m/44'/60'/0'/0/0` (e.g. `m/44'/60'/0'/0/1`), the money will not be registered by Trust Wallet.

Recovering the funds, however, is possible by importing the `m/44'/60'/0'/0/0` wallet's private key or keystore into Trust Wallet. This will then create a new sub-section in the user's wallet list where multi-coin wallets will be separate from manually imported single-coin wallets, but the funds will be retrievable.

Switching identities / accounts entails clicking on settings, wallets, and then picking one of these wallets.

### Status

Multi account support in Status is [difficult to set up](https://github.com/status-im/status-react/issues/6426) but easy to use once configured.

Switching accounts entails going to settings, logging out, and logging in with another user. It would be easier if fingerprint login was supported like in Trust, as the current password-based setup only makes people who use multiple accounts pick unsafe passwords to be able to switch quickly (password managers do not help matters).

Status does not allow custom derivation paths, and each new account is a new identity in its own right with its own special recovery phrase and thus new tree of wallets. Sending ether or tokens to `m/44'/60'/0'/0/0` works, but sending them to `m/44'/60'/0'/0/1` will not register the assets and they have to be extracted via other means.

Status does not allow private key imports, making these assets unrecoverable through this app.

### Walleth

In Walleth, the wallet-only (no dapp browser) Android app, the user can add accounts very easily, even attaching metadata to them like names and custom notes. These are stored on the device only.

Walleth supports hardware wallets and private key imports, as well as phrase imports, but it does not allow customizing derivation paths and does not read funds sent to non-zero paths like `m/44'/60'/0'/0/1`. The transactions will not be registered unless the address was imported via private key, not recovery phrase.

Transaction history is shown per-address when looking at that address.

### Opera

In Opera, switching crypto identities entails fully logging out of a wallet and logging into another with a different pass phrase. There is no concept of accounts or easily switching between them and there is no way to add an account through importing private keys.

Opera does not show transaction history and as such the only view a user is exposed to is the main Ethereum wallet view.

There is no derivation path support and assets sent to an alternative path will not be registered. As there is no private key import, these assets cannot be recovered through Opera.

### TenX

There is no support for multiple accounts at all. The accounts are stored on TenX servers, which means creating a new account entails creating a new email/password combination and using that after logging out of the app.

There is no concept of private key ownership or derivation paths as the wallet is fully custodial.

### Coinbase Wallet

Similarly to Opera, Coinbase wallet neither shows transactions for accounts, nor does it let you easily switch or import via private keys.

A full logout with a re-entry of the recovery phrase is required, and it is not possible to enter a different derivation path which means assets sent to `m/44'/60'/0'/0/1` rather than `m/44'/60'/0'/0/0` are lost until the wallet is opened in another app that supports this.

Coinbase Wallet further complicates matters by introducing a username feature which is never actually used for anything, but can still prevent you from opening a wallet as the app will warn you the "username has been taken". This is additionally odd due to the fact that a wallet shouldn't be stored on any server in any way, so it is not known what Coinbase is actually doing there.

### PandaX

PandaX has an extremely easy to use account-switching feature. Accounts can be imported via phrase, keystore or key and will be added to a master list under one user. There is no way to individually secure the accounts. Account switching is instant and extremely well done.

There is no support for non-standard derivation paths.

Wallet export is supported and a user can export both keystore and private key to retrieve assets on alternative derivation paths.

Transactions are shown per account, and each account can only have one Ethereum address.

### imToken

imToken allows securing both the app as a whole with a fingerprint, and also lets users replace individual wallet passwords with a fingerprint.

It lets users import via phrase, key, and keystore as well as offering a watch-only mode. During import via phrase, imToken will ask the user for the derivation path, allowing for two default presets and a custom one which is fully editable by the user. In order to add wallets on different derivation paths, the user must repeat the import process and supply a different path - the app will not auto-scan paths to any depth.

Switching identities is quick and easy - all it takes is a tap in the left sidebar when summoned. There is no way to log out of the application and clear your accounts to start over. What ever you've imported is there and the only way to get a completely new account going with nothing added is to fully clear the app's data.

Transactions and balances are shown for each active wallet separately.

### AlphaWallet

AlphaWallet only allows import by private key or keystore which means it ignores derivation path altogether. Switching accounts is very easy, one needs to open the settings and go to My Wallets where they're all listed and easily clickable.

The transactions and balance are then shown on individual wallet screens, with no common screen for all.

It should be noted that AlphaWallet does not secure wallets at all - it does not encrypt the keystore with a password. There is no way to add a password or a fingerprint.

AlphaWallet does not properly inject Web3 so many dapps do not recognize it, but when they do, the identity is immediately switched on wallet switch. It is not known whether or not the cookies are cleared as well.

## Conclusions

Among the tested wallets, only imToken offers derivation path choices but none auto-scan the paths for active accounts. The most useful ones are those that allow side-by-side usage of alternative accounts (Trust Wallet, Alpha Wallet, imToken, PandaX) or extremely easy import via various different methods.

There is a clear opening in the market for a well designed application that:

- offers individually securable but easily switchable accounts (only imToken offers this right now)
- joint TX list and balance for a root key and its derivation paths up to 1024, but separate TX and balance per account
- ability to generate new recipient addresses (single use, burner-like) starting from derivation path 5000 onwards or something hard to reach via conventional means. This would let a wallet request funds on a wallet that is seemingly fresh and only used once
- connecting to the above, the ability to swipe alternative addresses (from other derivation paths) without copying and pasting addresses, keys, etc. and without doing gas calculations in one's head
- again connecting to the above, clear flags of sub-derived addresses that have been used (burned), so the user knows not to use them again, or to use them sparingly
- metadata on accounts, allowing custom notes, names, identifiers and more (several wallets already offer this)
- easy imports and exports via all possible methods: key, keystore, phrase (most good wallets offer this)