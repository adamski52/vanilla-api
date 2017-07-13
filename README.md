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
