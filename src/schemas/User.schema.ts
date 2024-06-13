import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: false, required: true })
  password: string;

  @Prop({
    unique: false,
    required: true,
    default: 'user',
    enum: ['user', 'admin', 'ong'],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
