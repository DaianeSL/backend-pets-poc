import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ unique: false, required: true, enum: ['admin', 'ong', 'user'] })
  role: string;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
