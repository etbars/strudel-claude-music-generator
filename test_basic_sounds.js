// Basic Strudel sound test - manually created
// Testing core sounds that should work

setcpm(120/4)

// Test 1: Basic drum pattern
s("bd sd hh oh")

// Test 2: Basic synthesis
note("c d e f").sound("sine")

// Test 3: Piano sample
note("c3 e3 g3 c4").sound("piano")

// Test 4: Stack simple patterns
stack(
  s("bd ~ sd ~"),
  s("~ hh ~ hh"),
  note("c3 ~ e3 ~").sound("sawtooth")
)

// Test 5: Simple effects
s("bd sd hh oh").room(0.5).gain(0.8)
