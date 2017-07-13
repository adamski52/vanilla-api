# How's this work?

## Usernames are tracked by filenames
Specifically, filenames are the username run through the SHA256 algorithm, using itself as a salt:
```
{username} => sha256(salt = {username}) => {hashed filename}.json
```

## The User object is stored as encrypted JSON
Specifically, the contents of the user file is the string representation of the User JSON object, run through the AES192 algorithm, using the user's password as a salt:

```
{user representation} => aes192(salt = {user's password}) => file contents to store
```

This process is run in reverse when a user logs in:

```
encrypted contents => aes192(salt = {user's password}) => {user representation}
```

## How login works (will work)
1.  A user will enter his/her username and password.
2.  The username will be SHA256'd against itself, resulting in a hash
3.  The appropriate folder will be searched for a file whose name matches that hash
4.  This file will be opened, and its contents will be read as an AES192 cipher
5.  The cipher will be deciphered using the user's password.


## How it might work
It might be an improvement to do so, but I'm not sure if I'm going to make the filename use the password as the salt (instead of the username as the salt and the plaintext).  I'm not sure if it's worth the trouble to deal with renaming files when the user changes their password.

If I don't do this, it'll be possible to discover usernames.  I figure it's typically possible to do that anyway ("username already exists!").

If I do do this, I worry it'll put an attacker one step closer to breaking SHA256.  I don't believe this has been done but ???.

#### Why I think that
* Given a filename is `sha256({username} + {password})`
* Given that an attacker will be able to learn if a username is taken by attempting to create that username
* Then the attacker will have a partial plaintext and can use that to attack SHA256
  * I'm not sure if SHA256 is vulnerable to this but I'd rather not introduce it.  They're going to get the username either way.

