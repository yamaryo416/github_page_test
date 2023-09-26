# ジュースの管理
# 自動販売機はジュースを1種類格納できる
# ジュースは名前と値段の情報をもつ

# ジュースクラスを作成する
class Juice
  attr_reader :name, :price

  # ジュースは名前と値段の情報を持つ
  def initialize(name, price)
    @name = name
    @price = price
  end
end

