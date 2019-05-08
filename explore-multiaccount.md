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

## Conclusions

Among the tested wallets, none offer derivation path choices nor do they auto-scan the paths for active accounts. The most useful ones are those that allow side-by-side usage of alternative accounts (Trust Wallet) or extremely easy import via various different methods (Trust, Walleth).

There is a clear opening in the market for a well designed application that:

- offers individually securable but easily switchable accounts
- joint TX list and balance for a root key and its derivation paths up to 1024, but separate TX and balance per account
- ability to generate new recipient addresses (single use, burner-like) starting from derivation path 5000 onwards or something hard to reach via conventional means. This would let a wallet request funds on a wallet that is seemingly fresh and only used once
- connecting to the above, the ability to swipe alternative addresses (from other derivation paths) without copying and pasting addresses, keys, etc. and without doing gas calculations in one's head
- again connecting to the above, clear flags of sub-derived addresses that have been used (burned), so the user knows not to use them again, or to use them sparingly
- metadata on accounts, allowing custom notes, names, identifiers and more
- easy imports and exports via all possible methods: key, keystore, phrase