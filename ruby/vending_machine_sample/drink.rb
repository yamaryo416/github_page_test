class Drink
  attr_reader :name
  attr_reader :price

  # ジュースは名前と値段の情報を持つ
  def initialize(name:, price:)
    @name = name
    @price = price
  end
end

