// @flow

import bcrypt from 'bcryptjs'

import User from '$db/models/User'

import type {Id} from '$app/types'
import type {DbUser, UpsertUser} from '$db/models/User'

export const findUserById = async (id: Id): Promise<DbUser> =>
  User.findById(id)

export const findUserByUsername = async (username: string): Promise<DbUser> =>
  User.findOne({username})

export const upsertUser = async (payload: UpsertUser): Promise<DbUser> => {
  const isNew = !payload._id

  const passwordHash = await bcrypt.hash(payload.password, 10)
  const dbUser = {...payload, password: passwordHash}

  return isNew
    ? await User.create(dbUser)
    : await User.update(dbUser)
}