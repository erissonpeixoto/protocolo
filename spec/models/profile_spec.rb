require 'rails_helper'

RSpec.describe Profile, type: :model do

  it { is_expected.to have_many(:users)}

  [:name, :code].each do |attr|
    it { should validate_presence_of(attr) }
  end

end
