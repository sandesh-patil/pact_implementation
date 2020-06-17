# Setup
```
npm install
```

# Run requests against provider, you'll need two terminals

## Terminal 1
```
node provider/providerService.js
```

wait for "Provider Service listening on http://localhost:9123"

## Terminal 2
```
node consumer/consumer.js 
```

this sends requests directly to server and shows results as:
names
[]
createdName
{ first: 'Shima', id: 0 }
namesAfterCreate
[ { first: 'Shima', id: 0 } ]
deletedName
{ first: 'Shima', id: 0 }
namesAfterDelete
[]

# Run consumer against mock provider and generates pact
```
npm run test:pact:consumer
```

8 passing:
Pact with Our Provider
    when a call to get Names is made
      with no existing names
        ✓ can process the JSON payload from the provider
        ✓ should validate the interactions and create a contract
      with an existing name { first: "Shima" }
        ✓ can process the JSON payload from the provider
        ✓ should validate the interactions and create a contract
    when a call to create a name is made
      ✓ can process the JSON payload from the provider
      ✓ should validate the interactions and create a contract
    when a call to delete a name is made
      ✓ can process the JSON payload from the provider
      ✓ should validate the interactions and create a contract

# Verify provider against pact
```
npm run test:pact:provider
```

1 passing:
    ✓ should validate the expectations of Our Little Consumer (728ms)