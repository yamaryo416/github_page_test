require_relative 'pokemon'

# ピカチュークラスを作成する
class Pikachu < Pokemon
  
  def attack
    # 親クラスのメソッドの呼び出し
    super.attack
    puts "#{@name}の10万ボルト!"
  end
end