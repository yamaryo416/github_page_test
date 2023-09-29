require_relative 'name_service'

# プレイヤークラス
class Player
  include NameService
  def initialize(name)
    @name = name
  end
end
