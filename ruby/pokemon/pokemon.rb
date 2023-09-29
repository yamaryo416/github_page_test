# Pokemonクラスを作成
class Pokemon
  include NameService
  
  # インスタンス変数のアクセスをできるようにする
  attr_reader :name, :type1, :type2, :hp

  # インスタンスの初期化をする
  def initialize(name, type1, type2, hp)
    @name = name
    @type1 = type1
    @type2 = type2
    @hp = hp
  end

  def attack
    puts "#{name} のこうげき"
  end
end
