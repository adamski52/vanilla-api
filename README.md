# Getting started
1.  Clone me
2.  Don't bother running `npm install` - there are no dependencies of any sort
3.  If you're on a Mac, run `npm test` if you want to see the Testing Framework I put together do its magic.  The command doesn't work on Windows.  You can run the individual `*.spec.js` files individually if you'd like (`node path/to/file.spec.js`).
4.  You may need to install the `_secure/keys/cert.pem` to your browser or REST client in order for it to accept the insecure SSL connection.  If you need to fiddle with the certificate at all, it's not password protected.
5.  Run `npm start` to start up the server.  Port `:4242` needs to be open.
6.  Once started, you should be able to hit the following endpoints, given that all URLs are relative to "https://localhost:4242" (**https**, not http).
7.  Try playing with invalid URLs too... Method Not Allowed, Not Found etc should work as well.


# REST endpoints finished so far:
## Login
POST /api/users
```
{
   username: "adamski",
   password: "password"
}
```


# Create a user
There is no handy way to make a user yet.  You just need top stick a file in the `_secure/stores/users` file and name it by the convention listed at `_secure/stores/users/README.md`.



# Authentication
Using Node.js (and Node.js only) create a REST compliant API with routes that allow a user to:
1.  Login
2.  Logout


# Configurations
Building on the previous question, using Node.js (and Node.js only) create a REST compliant API with routes that allow an authenticated user to:

1.  Retrieve server configurations as JSON data​ (using the below as a sample)
2.  Create configurations
3.  Delete configurations
4.  Modify configurations

Use the following data as a guide for your records:
```
{
  "configurations" : [
     {
        "name" : "host1",
        "hostname" : "nessus-ntp.lab.com",
        "port" : 1241,
        "username" : "toto"
     },
     {
        "name" : "host2",
        "hostname" : "nessus-xml.lab.com",
        "port" : 3384,
        "username" : "admin"
     }
  ]
}
```

# Sorting
Building on the previous question, using Node.js (and Node.js only) modify your REST compliant API routes to support:

1. Sorting by name, hostname, port, or username
2. Pagination (you will need to randomize and expand the configurations for this)
