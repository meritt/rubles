describe 'rubles', ->

  {rubles} = require '../src/rubles'

  it 'first tests', ->
    text = rubles "4,99"
    text.should.equal 'четыре рубля 99 копеек'

    text = rubles 11.12
    text.should.equal 'одиннадцать рублей 12 копеек'