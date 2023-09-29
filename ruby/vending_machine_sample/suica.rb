class Suica
  # 定数を設定するので大文字で書く
  INITIAL_DEPOSIT = 500

  # Suicaは現在のチャージ残高を取得できる
  attr_reader :deposit

  def initialize(deposit: 0)
    # 預かり金（デポジット）として500円がデフォルトでチャージされている
    @deposit = INITIAL_DEPOSIT + deposit
  end

  # Suicaのチャージ残高から支払をする（Suicaの残高が足りない場合は例外を発生させる)
  # method_name!の!は値を変化させるときや例外を発生させるときに付与するのがrubyの習慣
  def pay!(val)
    if @deposit < val
      raise "残高が足りません"
    end

    @deposit -= val
  end

  def charge!(val)
    # Suicaには100円以上の任意の金額をチャージできる
    # 100円以下の場合は例外を発生させる
    if val < 100
      raise "100円以上をチャージしてください"
    end

    @deposit += val
  end
end

