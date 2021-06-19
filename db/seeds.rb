# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Profile.find_or_create_by!(name: "Administrador", code: 1, fixed: true)
Profile.find_or_create_by!(name: "Solicitante", code: 2, fixed: true)

User.create(name: "Erisson", email: "erisson.intersol@gmail.com",
            password: '!@12345#$',
            password_confirmation: '!@12345#$',
            profile_id: Profile.find_by_code(1).id)
